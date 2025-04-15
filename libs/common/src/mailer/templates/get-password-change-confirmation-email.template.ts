import { getWrapperTemplate } from './get-wrapper.template';

export function getPasswordChangeConfirmationTemplate({
  name,
}: {
  name: string;
}) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Change Confirmation - AnimeHubInsider</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r  text-white font-sans">

    <div class="max-w-3xl mx-auto p-8">
        <div class="text-center mb-8">
            <img src="https://via.placeholder.com/150" alt="AnimeHubInsider Logo" class="mx-auto mb-4 rounded-full">
            <h1 class="text-2xl font-bold mb-2">Password Change Confirmation</h1>
            <p class="text-gray-400">Your AnimeHubInsider password has been successfully changed.</p>
        </div>

        <div class="bg-gradient-to-br  rounded-lg p-6 mb-6 shadow-lg">
            <p class="text-lg mb-4">Dear ${name},</p> 
            <p class="mb-4">This email confirms that your AnimeHubInsider account password has been successfully changed.</p>
            <p class="mb-4">If you did not initiate this password change, please contact our support team immediately at <a href="mailto:support@animehubinsider.com" class="text-blue-500 hover:underline">support@animehubinsider.com</a>.</p>
            <p class="mb-4">For security reasons, we recommend that you keep your password confidential and change it periodically.</p>

            <div class="mt-6 text-center">
                <a href="https://animehubinsider.com/login" class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded shadow-md">Go to Login</a>
            </div>
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
