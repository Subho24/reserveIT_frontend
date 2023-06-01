import { Header } from '../components/Header2';
import Info from '../components/aboutUs'
import { Footer } from '../components/Footer';

export const About_us =(props)=> {
  console.log(props)
    return(
        <div>
        <Header />
        <Info />
        <Footer />
      </div>
    )

}