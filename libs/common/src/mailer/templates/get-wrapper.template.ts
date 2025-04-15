export function getWrapperTemplate(template: string) {
  return `<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script async defer src="https://cdn.tailwindcss.com" />
	</head>

	<body>
    ${template}
	</body>
</html>`;
}
