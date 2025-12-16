
import './header.css';
import Logo from '../../assets/Logo.svg';

export default function Head() {
  return (
    <>
        <div className="backgroundhead">
            <div className="logo">
                <img src={Logo}/>
            </div>
        </div>
    </>
  )
}