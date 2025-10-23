export default function Loading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <div className="space-y-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="text-gray-600">Loading admin panel...</p>
      </div>
    </div>
  );
}
