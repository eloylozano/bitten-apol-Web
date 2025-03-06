import React from "react";
import { SyncLoader } from "react-spinners";

const MyComponent = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 segundos de carga
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      {loading ? (
        <div 
          style={{
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "100vh"
          }}
        >
          <SyncLoader color="#5542F6" loading={loading} size={15} />
        </div>
      ) : (
        <div>Contenido cargado</div>
      )}
    </div>
  );
};

export default MyComponent;
