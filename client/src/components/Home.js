import Navbar from "./Navbar";
import Carousel from "./Carousel";
import About from "./About";
import Gallery from "./Gallery";
import Contact from "./Contact";
import Reservation from "./Reservation";

const Home = () => {
    return (
        <>
            <Navbar />
            <Carousel />
            <About />
            <Gallery />
            <Reservation />
            <Contact />
        </>
    );
}

export default Home;