<script>
  /**
   * The text to display inside the button.
   * @type {string}
   */
  export let text = "Button";
  /**
   * The source URL for an optional image.
   * @type {string}
   */
  export let imgSrc = "";

//   export let textColor = "";
//   export let hoverColor = "";
//   export let borderColor = "";
</script>

<button class="glowing-btn">
  <!-- These four spans will be animated to create the border effect -->
  <span class="border-span"></span>
  <span class="border-span"></span>
  <span class="border-span"></span>
  <span class="border-span"></span>
  {#if imgSrc}
    <img src={imgSrc} alt="" class="btn-icon" />
  {/if}
  <span>{text}</span>
</button>

<style>
  .glowing-btn {
    /* Positioning and base styles */
    position: relative;
    display: inline-flex; /* Use inline-flex for alignment */
    align-items: center;  /* Center items vertically */
    gap: 10px;            /* Add space between image and text */
    padding: 15px 30px;
    
    /* Typography */
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;
    color: #8a2be2; /* Bright Purple */
    
    /* Appearance */
    background-color: transparent;
    border: 2px solid #8a2be2;
    border-radius: 8px;
    cursor: pointer;
    overflow: hidden; /* Crucial for containing the animation */
    
    /* Smooth transitions for hover effects */
    transition: all 0.3s ease;
  }

  .btn-icon {
    height: 1.2em; /* Set height relative to font size */
    width: auto;
    transition: filter 0.3s ease;
  }

  .glowing-btn:hover {
    background-color: #8a2be2;
    color: #fff;
    box-shadow: 0 0 10px #8a2be2, 0 0 40px #8a2be2, 0 0 80px #8a2be2;
    /* Delay the background color change to let the border animation play out first */
    transition-delay: 1s; 
  }

  /* Invert icon color on hover for better contrast */
  .glowing-btn:hover .btn-icon {
    filter: invert(1);
    transition-delay: 1s;
  }

  .border-span {
    position: absolute;
    display: block;
  }

  /* --- Top Border Animation --- */
  .border-span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
  }

  .glowing-btn:hover .border-span:nth-child(1) {
    left: 100%;
    transition: left 1s;
  }

  /* --- Right Border Animation --- */
  .border-span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
  }
  
  .glowing-btn:hover .border-span:nth-child(2) {
    top: 100%;
    transition: top 1s;
    transition-delay: 0.25s; /* Start after the top border finishes */
  }
  
  /* --- Bottom Border Animation --- */
  .border-span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
  }
  
  .glowing-btn:hover .border-span:nth-child(3) {
    right: 100%;
    transition: right 1s;
    transition-delay: 0.5s; /* Start after the right border finishes */
  }
  
  /* --- Left Border Animation --- */
  .border-span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
  }
  
  .glowing-btn:hover .border-span:nth-child(4) {
    bottom: 100%;
    transition: bottom 1s;
    transition-delay: 0.75s; /* Start after the bottom border finishes */
  }
</style>

