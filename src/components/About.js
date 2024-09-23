import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import "../styles/styles.css"

const About = () => {
document.title = 'About';
  return(
    <>
    <CssBaseline/>
    <Toolbar/>

    <Container maxWidth="md">
        <Paper elevation={4}>
            
          <div className="fl">
            <br/>
            <img src="https://avatars.githubusercontent.com/u/117854313?v=4" className="photo"/>
            <br/>
            <a>
              This is a homework task solution for Sourcery Academy / Devbridge.
            </a>
            <a href="https://github.com/wishpath/CSVReaderBackendJavaH2">Source code - backend</a>
            <a href="https://github.com/wishpath/-CSVReaderFrontendReact">Source code - frontend</a>
            <br/>
            <a>
              Completed by Simonas Aruna, soon to be known as the best programmer ever:
            </a>
            <a href="https://www.linkedin.com/in/simonas-aruna/">LinkedIn</a>
            <a href="https://github.com/wishpath">GitHub</a>
            

            <a>+37063644328</a>
            <a>simonas.aruna[at]gmail.com</a>
            <br/>
          </div>   
        </Paper>
    </Container>
    </>
  );
}
export default About;