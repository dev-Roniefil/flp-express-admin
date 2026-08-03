<template>
  <div>
    <section class="page-hero snow-bg">
      <div class="hero-overlay">
        <div class="container">
          <div class="hero-content">
            <h1>PRIVACY POLICY</h1>
            <p class="breadcrumb">HOME / PRIVACY POLICY</p>
          </div>
        </div>
      </div>
    </section>

    <div class="page-main-section container">
      <div class="legal-content">
        <p class="updated">Last updated: July 30, 2026</p>

        <h2>1. Introduction</h2>
        <p>
          Festive Lighting Pros Express (“we”, “us”) respects your privacy. This Privacy Policy
          explains how we collect, use, and protect information when you use our website and services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect:</p>
        <ul>
          <li>Contact details (name, email, phone, address)</li>
          <li>Order and billing information</li>
          <li>Account credentials and preferences</li>
          <li>Technical data (IP address, browser type, device)</li>
        </ul>

        <h2>3. How We Use Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Process orders and schedule installations</li>
          <li>Communicate about your account or service</li>
          <li>Improve our website and offerings</li>
          <li>Send marketing only if you opt in (you may unsubscribe anytime)</li>
        </ul>

        <h2>4. Sharing of Information</h2>
        <p>
          We do not sell your personal information. We may share data with service providers
          (payment processors, email delivery, install partners) only as needed to operate
          our business, or when required by law.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Our site may use cookies and similar technologies for login sessions, cart, and
          analytics. You can control cookies through your browser settings.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We take reasonable measures to protect your information. No method of transmission
          over the internet is 100% secure.
        </p>

        <h2>7. Your Choices</h2>
        <p>
          You may request access, correction, or deletion of your personal data by contacting us.
          Some information may be retained as required for legal or business purposes.
        </p>

        <h2>8. Children’s Privacy</h2>
        <p>
          Our Services are not directed to children under 13. We do not knowingly collect
          personal information from children.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The “Last updated” date will
          reflect the latest version.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          For privacy questions:
          <a href="/contact">Contact Us</a> or call (941) 222-1012.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

useHead({
  title: 'Privacy Policy'
})
</script>

<style scoped>
.legal-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 0 80px;
  color: #334155;
  line-height: 1.7;
}

.legal-content .updated {
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 32px;
}

.legal-content h2 {
  color: #0c2340;
  font-size: 1.25rem;
  margin: 32px 0 12px;
}

.legal-content p {
  margin-bottom: 12px;
}

.legal-content ul {
  margin: 0 0 12px 1.25rem;
  padding: 0;
}

.legal-content li {
  margin-bottom: 6px;
}

.legal-content a {
  color: #F49322;
  text-decoration: none;
  font-weight: 500;
}

.legal-content a:hover {
  text-decoration: underline;
}
</style>