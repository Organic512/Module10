const readline = require('readline');
const fs = require('fs');
const { createCanvas, registerFont } = require('canvas');

const canvas = createCanvas(300, 200);
const ctx = canvas.getContext('2d');

const fontPath = 'Bradley Hand Bold.ttf';
const fontSize = 40;
registerFont(fontPath, { family: 'CustomFont' });

function generateSVG(text, textColor, shape, shapeColor) {
  ctx.fillStyle = textColor;

  ctx.beginPath();
  switch (shape) {
    case 'circle':
      ctx.arc(150, 100, 50, 0, 2 * Math.PI);
      break;
    case 'triangle':
      ctx.moveTo(150, 50);
      ctx.lineTo(100, 150);
      ctx.lineTo(200, 150);
      ctx.closePath();
      break;
    case 'square':
      ctx.rect(100, 50, 100, 100);
      break;
    default:
      break;
  }
  ctx.fill();

  ctx.font = `${fontSize}px CustomFont`;
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 150, 100);

  return canvas.toBuffer().toString('utf8');
}

function saveSVG(svgContent) {
  const fileName = 'logo.svg';
  fs.writeFileSync(fileName, svgContent);
  console.log(`Generated ${fileName}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter up to three characters: ', (text) => {
  rl.question('Enter text color (keyword or hex): ', (textColor) => {
    rl.question('Choose a shape (circle, triangle, square): ', (shape) => {
      rl.question('Enter shape color (keyword or hex): ', (shapeColor) => {
        const svgContent = generateSVG(text.slice(0, 3), textColor, shape, shapeColor);

        saveSVG(svgContent);

        rl.close();
      });
    });
  });
});

rl.on('close', () => {
  process.exit(0);
});
