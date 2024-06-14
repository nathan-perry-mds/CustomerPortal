export default function setBackground() {
  const images = [
    'url(/AboutUs.jpg)',
    'url(/background.jpg)',
    'url(/sectors.jpg)',
    'url(/solutions.jpg)'
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];
  console.log('Selected Image:', randomImage); // Debugging line
  document.documentElement.style.setProperty('--background-image', randomImage);
}
