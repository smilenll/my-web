"use server";

import puppeteer from "puppeteer";

export async function scrapeCompletedJobs() {
  const browser = await puppeteer.launch({
  headless: false, // 👈 Shows the browser
  defaultViewport: null, // Optional: Use full screen
  slowMo: 50 // Optional: slows actions down so you can see them
});

  const page = await browser.newPage();
  console.log("Scraping Towbook...");


  try {
    // 1. Login
    await page.goto("https://app.towbook.com/Security/Login.aspx", {
      waitUntil: "networkidle2",
    });

    await page.type("#Username", process.env.TOWBOOK_USERNAME!);
    await page.type("#Password", process.env.TOWBOOK_PASSWORD!);

    await Promise.all([
      page.click("#bSignIn"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // 2. Navigate to DS4 dashboard
    await page.goto("https://app.towbook.com/DS4/", {
      waitUntil: "networkidle2",
    });

    // 3. Click on Completed tab
    await page.waitForSelector("#atCompleted", { visible: true });
    await page.click("#atCompleted");
    await page.waitForSelector(".entryRow"); // Wait until jobs start loading

    await page.evaluate(async () => {
  // CHANGE THIS SELECTOR as needed!
  const container = document.querySelector('.tabContainer') 
      || document.scrollingElement 
      || document.body;

  function delay(ms: number) { return new Promise(res => setTimeout(res, ms)); }
  let lastScrollTop = -1;
  let retries = 0;

  while (retries < 5) {
    container.scrollTo(0, container.scrollHeight);
    await delay(1500);
    if (container.scrollTop === lastScrollTop) {
      retries++;
    } else {
      retries = 0;
      lastScrollTop = container.scrollTop;
    }
  }
});


    // 5. Scrape visible job entries
    const jobs = await page.evaluate(() => {
      const extractDate = function (text: string) {
        const start = text.indexOf("(");
        const end = text.indexOf("@");
        if (start === -1 || end === -1) return null;
        return text.slice(start + 1, end).trim();
      };

      const rows = Array.from(document.querySelectorAll(".entryRow"));
      return rows.map((row) => {
        const getText = (selector: string) =>
          row.querySelector(selector)?.textContent?.trim() || null;

        // Get insurance company from details1 list
        const details = Array.from(row.querySelectorAll(".details1 li"));
        const insuranceCompany = details
          .find(
            (li) =>
              li.querySelector(".title")?.getAttribute("title") === "Account"
          )
          ?.querySelector(".text")
          ?.textContent?.trim();

        const po = details
          .find(
            (li) => li.querySelector(".title")?.getAttribute("title") === "PO #"
          )
          ?.querySelector(".text")
          ?.textContent?.trim();
        const date = extractDate(getText(".text") || "");
        return {
          id: (getText(".call-number")  ?? "").slice(1),
          vehicle: getText(".big-text"),
          insuranceCompany,
          po,
          date,
        };
      });
    });

    console.log("Scraped jobs:", jobs.length);
    return jobs;
  } catch (err) {
    console.error("Scraping error:", err);
    return [];
  } finally {
    await browser.close();
  }
}
