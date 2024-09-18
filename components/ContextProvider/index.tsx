import React, {createContext, ReactNode, useContext, useState} from 'react';

type Props = {
  children: ReactNode;
};

const UserContext = createContext<any>(null);

function ContextProvider(props: Props): React.JSX.Element {
  const {children} = props;
  const [user, setUser] = useState<{username: string | null}>({username: null});
  const [session, setSession] = useState<{username: string | null}>({
    username: null,
  });

  return (
    <UserContext.Provider value={{user, setUser, session, setSession}}>
      {children}
    </UserContext.Provider>
  );
}

export default ContextProvider;

export const useUser = () => useContext(UserContext);
