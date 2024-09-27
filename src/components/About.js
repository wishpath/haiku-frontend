import "../styles/styles.css";

const About = () => {
  document.title = 'About';
  return (
    <>
      <div className="toolbar" />
      <div className="container" style={{ maxWidth: '768px', margin: 'auto', marginTop: '20px' }}>
        <div className="paper" style={{
          padding: '20px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Soft shadow effect
          borderRadius: '4px',
          backgroundColor: '#fff', // Optional: Set background color for the paper
        }}>
          <div className="fl">
            <img src="https://avatars.githubusercontent.com/u/117854313?v=4" className="photo" alt="Profile" />
            <br />
            <a style={{ textShadow: '0px 0px 2px rgba(0, 0, 0, 0.2)' }}>Simonas Aruna</a>
            <br />
            <a>🔒 Committed  to mastering ✨ the craft of programming 💻</a>
            <br />
            <a href="https://www.linkedin.com/in/simonas-aruna/">LinkedIn</a>
            <br />
            <a href="https://github.com/wishpath">GitHub</a>
            <br />
            <a>+37063644328</a>
            <br />
            <a>simonas.aruna[at]gmail.com</a>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
