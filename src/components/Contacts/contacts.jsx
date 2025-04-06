import React, { useState } from "react";

function ContactUs() {
  // States for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for the presence of at least an email or phone number
    if (!email && !phone) {
      setError("Navedite vsaj vaš e-poštni naslov ali telefonsko številko.");
      return;
    }

    // Check for message availability
    if (!message) {
      setError("Sporočilo ne sme biti prazno.");
      return;
    }

    // Error clearing and setting send status
    setError("");
    setSubmitted(true);

    // Logging data (which can be replaced with sending to a server)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Obrnite se</h2>

        {submitted ? (
          <p className="text-green-600 text-center">
            Hvala! Vaše sporočilo je bilo poslano.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">
                Sporočilo <span className="text-red-600">*</span>:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Vnesite svoje sporočilo"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Display error if any*/}
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label className="block text-gray-700">Ime:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Vnesite svoje ime"
                style={{
                  marginLeft: "36px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Vnesite vaš email"
                style={{
                  marginLeft: "25px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div>
              <label className="block text-gray-700">Telefon:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Vnesite svojo telefonsko številko"
                style={{
                  marginLeft: "12px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Pošlji
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactUs;
