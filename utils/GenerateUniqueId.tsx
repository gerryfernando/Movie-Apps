function GenerateUniqueId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`; // Add a random number
}

export default GenerateUniqueId;
