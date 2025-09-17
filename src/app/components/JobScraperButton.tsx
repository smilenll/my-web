"use client";

import { useState } from "react";
import { scrapeCompletedJobs } from "../actions/towbook";

export function JobScraperButton() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchJobs = async () => {
    setLoading(true);

    const res = await scrapeCompletedJobs();
    setJobs(res);
    setLoading(false);
  };

  const filteredJobs = (jobs: any) =>
    jobs
      .slice()
      .reverse()
      .filter((job: any) => {
        if (!job.date) return false;

        const [month, day, year] = job.date.split("/");
        const jobDate = new Date(`${year}-${month}-${day}`);

        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && jobDate < from) return false;
        if (to && jobDate > to) return false;

        return true;
      });
  return (
    <div>
      <button
        className="bg-blue-500 px-4 py-2 rounded"
        onClick={fetchJobs}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Scrape Completed Jobs"}
      </button>

      <div className="flex gap-4 my-4">
        <div>
          <label className="block text-sm mb-1">From Date</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">To Date</label>
          <input
            type="date"
            className="border p-2 rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="bg-blue-500 px-4 py-2 rounded"
          onClick={() => setJobs((prev) => filteredJobs(prev))}
        >
          Filter
        </button>
      </div>

      <table className="text-sm w-full border">
        <thead>
          <tr>
            <th className="p-2 text-left">Job ID</th>
            <th className="p-2 text-left">Vehicle</th>
            <th className="p-2 text-left">Insurance Company</th>
            <th className="p-2 text-left">PO</th>
            <th className="p-2 text-left">Comment</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => (
            <JobListItem job={job} key={job.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type CompletedJob = {
  id: string | null;
  vehicle: string | null;
  insuranceCompany: string | null;
  po: string | null;
  date: string | null;
};

type Props = {
  job: CompletedJob;
};

const existingCompletedJobs= [
  23119, 23130, 23125, 23153, 23151, 23169, 23196, 23197, 23199, 23200,
  23206, 23161, 23168, 23211, 23235, 23290, 23236, 23290, 23290, 23290,
  23301, 23310, 23298, 23332, 23354, 23356, 23360, 23364, 23378, 23389,
  23390, 23399, 23403, 23404, 23445, 23438, 23466, 23468, 23490, 23491,
  23493, 23488, 23489, 23506, 23510, 23515, 23518, 23528, 23544, 23552,
  23560, 23571, 23572, 23573, 23609, 83, 23671, 23675, 23663, 23693,
  89, 90, 23706, 23700, 23701, 23718, 23710, 23727, 23731, 23732, 23714,
  23760, 23739, 103, 23751, 23758, 23774, 23775, 23778, 23779, 23797,
  23803, 23806, 23812, 23814, 23822, 23858, 23866, 23871, 23863, 23877,
  23855, 23879, 124, 23886, 23881, 23931, 23951, 23941, 23956, 23953,
  23938, 23961, 23970, 23980, 23985, 23987, 24000, 24011, 24059, 24065,
  151, 24103, 24106, 24140, 24138, 158, 24091, 24154, 24173, 24190,
  24218, 24229, 24230, 24242, 24243, 24245, 24257, 24282, 24284, 24285
]

export function JobListItem({ job }: Props) {
  const filed = existingCompletedJobs.some((id) => id === Number(job.id));
  return (
    <tr className={(filed && "bg-red-600") || ""}>
      <td className="p-2">{job.id ?? "N/A"}</td>
      <td className="p-2">{job.vehicle ?? "N/A"}</td>
      <td className="p-2">{job.insuranceCompany ?? "N/A"}</td>
      <td className="p-2">{job.po ?? "N/A"}</td>
      <td className="p-2"></td>
      <td className="p-2">{job.date ?? "N/A"}</td>
    </tr>
  );
}
