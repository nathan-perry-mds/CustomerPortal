const setBackground = () => {
  const images = ['AboutUs.jpg', 'background.jpg', 'sectors.jpg', 'solutions.jpg'];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  document.documentElement.style.setProperty('--background-image', `url('/${randomImage}')`);
};

export default setBackground;
