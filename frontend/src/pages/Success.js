import { Link } from 'react-router-dom';
import { FaCheckCircle, FaWhatsapp, FaPhone } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl text-center max-w-lg">
        <FaCheckCircle className="text-8xl text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Request Submitted Successfully!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you! Our team has received your errand request.
          <br />
          We will contact you shortly via <strong>WhatsApp</strong> or <strong>call</strong> to confirm details and agree on the final cost.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <div className="flex items-center">
            <FaWhatsapp className="text-3xl text-green-500 mr-2" />
            <span>WhatsApp</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="text-3xl text-blue-600 mr-2" />
            <span>Phone Call</span>
          </div>
        </div>
        <Link to="/" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;