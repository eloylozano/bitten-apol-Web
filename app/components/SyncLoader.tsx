import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 segundos de carga
  }, []);

  return (
    <div 
      style={{ 
        height: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        margin: 0, 
        padding: 0,
      }}
    >
      {loading ? (
        <SyncLoader color="#5542F6" loading={loading} size={15} />
      ) : (
        <div>Contenido cargado</div>
      )}
    </div>
  );
};

export default Loading;