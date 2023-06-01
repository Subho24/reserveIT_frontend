import { Header } from '../components/Header2';
import { Footer } from '../components/Footer';
import  MainContainer  from '../components/MainContainer';
import Text from '../components/fortextline';
import Why from '../components/WhyReserveIT';
import SupInfo from '../components/SupportInfo';
import Imgmoreicons from '../components/img';

export const Home =()=> {
    return(
        <div>
        <Header />
        <MainContainer />
        <Why />
        <SupInfo/>
        <Imgmoreicons/>
        <Text />
        <Footer />
      </div>
    )

}