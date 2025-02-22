import { 
    FaUtensils, 
    FaGasPump, 
    FaShoppingCart, 
    FaMoneyBillAlt,
    FaHouseUser,
    FaFilm,
    FaHeartbeat,
    FaGraduationCap
  } from 'react-icons/fa';
  
  const categoryIcons = {
    food: <FaUtensils className="fs-5" />,
    transport: <FaGasPump className="fs-5" />,
    shopping: <FaShoppingCart className="fs-5" />,
    bills: <FaMoneyBillAlt className="fs-5" />,
    housing: <FaHouseUser className="fs-5" />,
    entertainment: <FaFilm className="fs-5" />,
    health: <FaHeartbeat className="fs-5" />,
    education: <FaGraduationCap className="fs-5" />
  };
  
  export default categoryIcons;