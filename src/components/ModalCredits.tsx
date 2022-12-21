import React from "react";
import Modal from "./Modal";
import Text from "./Text";

function ModalCredits() {

  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {

    const fetchGithubUser = async () => {
      const response = await fetch("https://api.github.com/users/dhrleandro");

      const json = await response.json();
      setAvatar(json.avatar_url);
    }

    fetchGithubUser()
      .catch(console.error);
  }, []);

  return (
    <Modal
      opened={true}
      w={300}
      h={300}
      solidCloseButton={true}
      solidCloseButtonText={'Start'}
    >
      <Text style={{fontSize: '3rem', marginBottom: '1rem'}}>Lixlr</Text>


      <img
        src={avatar}
        alt=""
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '100%',
          marginBottom: '1rem'
        }}
      />

      <Text style={{marginBottom: '1rem'}}>Developed by Leandro Daher</Text>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '1rem'
      }}>
        <Text><a style={{color: 'var(--solid-bg)'}} href="https://github.com/dhrleandro/lixlr">Github</a></Text>
      </div>

    </Modal>
  );
}

export default ModalCredits;
