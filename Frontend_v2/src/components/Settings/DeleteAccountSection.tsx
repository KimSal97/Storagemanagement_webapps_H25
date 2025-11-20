"use client";

export default function DeleteAccountSection() {
  const handleDelete = () => {
    console.log("Delete user…");
  };

  return (
    <section className="bg-white shadow rounded-xl p-6 border border-[#D9E4F2]">
      <h2 className="text-xl font-semibold text-red-600 mb-3">Slett konto</h2>

      <p className="text-gray-600 mb-4">
        Denne handlingen kan ikke angres.
      </p>

      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Slett konto
      </button>
    </section>
  );
}
