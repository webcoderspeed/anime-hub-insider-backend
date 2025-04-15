import { getWrapperTemplate } from './get-wrapper.template';

export function getWelcomeEmailTemplate({ name }: { name: string }) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AnimeHubInsider!</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r from-gray-900 to-black text-white font-sans">

    <div class="max-w-3xl mx-auto p-8">
        <div class="text-center mb-8">
            <img src="https://via.placeholder.com/150" alt="AnimeHubInsider Logo" class="mx-auto mb-4 rounded-full">
            <h1 class="text-3xl font-bold mb-2">Welcome to AnimeHubInsider!</h1>
            <p class="text-gray-400">Your Ultimate Anime Streaming Destination.</p>
        </div>

        <div class="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-6 mb-6 shadow-lg">
            <p class="text-lg mb-4">Dear ${name},</p>
            <p class="mb-4">We're thrilled to welcome you to AnimeHubInsider, your new home for all things anime! Get ready to dive into a vast library of the latest releases, classic favorites, and exclusive content.</p>
            <p class="mb-4">Here's what you can expect:</p>
            <ul class="list-disc list-inside mb-4">
                <li>Endless Streaming: Enjoy unlimited access to a wide range of anime series and movies.</li>
                <li>High-Quality Video: Stream your favorite shows in stunning HD.</li>
                <li>New Releases: Stay up-to-date with the latest episodes and releases.</li>
                <li>Community Features: Connect with fellow anime fans through discussions and forums.</li>
                <li>Personalized Recommendations: Discover new anime tailored to your taste.</li>
            </ul>

            <p class="mb-4">To get started, simply click the button below:</p>

            <div class="text-center">
                <a href="https://animehubinsider.com/activate" class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded shadow-md">Activate Your Account</a>
            </div>
        </div>

        <div class="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg p-6 mb-6 shadow-lg">
            <h2 class="text-xl font-semibold mb-4">Explore Popular Anime</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg overflow-hidden shadow-md">
                    <img src="https://via.placeholder.com/200x300" alt="Anime 1" class="w-full">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">Anime Title 1</h3>
                        <p class="text-gray-400">Genre, Episodes...</p>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg overflow-hidden shadow-md">
                    <img src="https://via.placeholder.com/200x300" alt="Anime 2" class="w-full">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">Anime Title 2</h3>
                        <p class="text-gray-400">Genre, Episodes...</p>
                    </div>
                </div>
                <div class="bg-gradient-to-br from-gray-700 to-gray-600 rounded-lg overflow-hidden shadow-md">
                    <img src="https://via.placeholder.com/200x300" alt="Anime 3" class="w-full">
                    <div class="p-4">
                        <h3 class="text-lg font-semibold">Anime Title 3</h3>
                        <p class="text-gray-400">Genre, Episodes...</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="text-center mt-8">
            <p class="text-gray-500">Stay connected with us:</p>
            <div class="flex justify-center mt-2">
                <a href="#" class="mx-2"><img src="https://via.placeholder.com/30" alt="Facebook"></a>
                <a href="#" class="mx-2"><img src="https://via.placeholder.com/30" alt="Twitter"></a>
                <a href="#" class="mx-2"><img src="https://via.placeholder.com/30" alt="Instagram"></a>
            </div>
            <p class="text-gray-500 mt-4">&copy; 2024 AnimeHubInsider. All rights reserved.</p>
        </div>
    </div>

</body>
</html>
`;

  return getWrapperTemplate(template);
}
