<template>
  <div id="contact-wrapper">
    <div class="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions or need further information, feel free to reach out to us:</p>
      <ul class="contact-info">
        <li><strong>Email:</strong> support@example.com</li>
        <li><strong>Phone:</strong> +1 234 567 890</li>
        <li><strong>Address:</strong> 1 Tänav Street, Tartu, Estonia</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#contact-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

.contact-container {
  max-height: fit-content;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  margin: 5vw auto;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
}

h1 {
  margin-bottom: 20px;
}

.contact-info {
  text-align: left;
  padding: 15px;
}

.contact-info li {
  margin-bottom: 10px;
}
</style>
