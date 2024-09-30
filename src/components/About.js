import "../styles/about.css";


//no need for async - "const About = async () => {"
// because doesn't involve any asynchronous operations such as API calls, file reading, or timers
const About = () => {

  //tab title
  document.title = 'About';

  //returns JSX (React's syntax for rendering UI) (JavaScript XML)
  return (
    <>
      <div className="toolbar" />
      <div className="container">
        <div className="paper">
          <div className="fl">
            <img src="https://avatars.githubusercontent.com/u/117854313?v=4" className="photo" alt="Profile" />
            <br />
            <a className="name">Simonas Aruna</a>
            <br />
            <a className="motto">🔒 Committed to mastering ✨ the craft of programming 💻</a>
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
};

//exported so that it can be imported and used in other parts of the application.
//"export default" - allows when importing, giveing it any custom name like "import CustomName from './About'"
//otherwise - "export { About };" would require exact naming "import { About } from './About';"
export default About;