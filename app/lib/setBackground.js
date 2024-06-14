const setBackground = () => {
  console.log('setBackground is called'); // Add this line
  const images = ['AboutUs.jpg', 'background.jpg', 'sectors.jpg', 'solutions.jpg'];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  console.log('Selected Image:', randomImage); // Ensure this line is here
  document.documentElement.style.setProperty('--background-image', `url('/${randomImage}')`);
};

export default setBackground;
