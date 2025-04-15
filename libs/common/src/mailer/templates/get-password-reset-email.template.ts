import { getWrapperTemplate } from './get-wrapper.template';

export default function getPasswordResetEmailTemplate(
  name: string,
  resetURL: string,
) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request - AnimeHubInsider</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r  text-white font-sans">

    <div class="max-w-3xl mx-auto p-8">
        <div class="text-center mb-8">
            <img src="https://via.placeholder.com/150" alt="AnimeHubInsider Logo" class="mx-auto mb-4 rounded-full">
            <h1 class="text-2xl font-bold mb-2">Password Reset Request</h1>
            <p class="text-gray-400">Please reset your AnimeHubInsider password.</p>
        </div>

        <div class="bg-gradient-to-br  rounded-lg p-6 mb-6 shadow-lg">
            <p class="text-lg mb-4">Dear ${name},</p>
            <p class="mb-4">You have requested to reset your AnimeHubInsider account password. To proceed, please click the button below:</p>

            <div class="text-center mt-6">
                <a href="${resetURL}" class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded shadow-md">Reset Password</a>
            </div>

            <p class="mt-4 mb-4">This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>

            <p class="mb-4">For security reasons, we recommend that you create a strong, unique password.</p>

            <p class="mb-4">If you have any questions or need further assistance, please contact our support team at <a href="mailto:support@animehubinsider.com" class="text-blue-500 hover:underline">support@animehubinsider.com</a>.</p>
        </div>

        <div class="text-center mt-8">
            <p class="text-gray-500">Stay connected with us:</p>
            <div class="flex justify-center mt-2">
                <a href="#" class="mx-2"><i class="fab fa-facebook-f text-lg"></i></a>
                <a href="#" class="mx-2"><i class="fab fa-twitter text-lg"></i></a>
                <a href="#" class="mx-2"><i class="fab fa-instagram text-lg"></i></a>
            </div>
            <p class="text-gray-500 mt-4">&copy; 2024 AnimeHubInsider. All rights reserved.</p>
        </div>
    </div>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</body>
</html>
`;

  return getWrapperTemplate(template);
}
