import Logo from '../../components/Logo/Logo.js';
import FormRegister from '../../components/Forms/FormRegister/FormRegister.js';
import WrapperNav from '../../components/WrapperNav/WrapperNav.js';
import Wrapper from '../../components/Wrapper/Wrapper.js';

import './NewRegister.css'


function NewRegister() {

  return (
    <div className="register-page">  
      <WrapperNav>
        <Logo color="dark" size="medium" />
      </WrapperNav>    
      <Wrapper>
        <FormRegister />
      </Wrapper>
    </div>
  )
}

export default NewRegister;
