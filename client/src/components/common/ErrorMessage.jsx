export default function ErrorMessage({ title = "Please review the form", message }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm"
    >
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-red-600">{message}</p>
    </div>
  );
}
