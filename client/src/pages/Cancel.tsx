const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Payment Cancelled 😔</h1>
        <p className="mt-4 text-gray-500">
          Your payment was not completed. You can try again or continue
          shopping.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Back to Store
        </a>
      </div>
    </div>
  );
};

export default Cancel;
