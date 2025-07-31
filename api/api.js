import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_HOST } from '../utils/costants';

export function getTiposUsuario() {
  const url = `${API_HOST}/maestros/getTiposUsuario`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
      // return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getDepartamentos() {
  const url = `${API_HOST}/maestros/getDepartamentos`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getCiudadByDepartamento(id) {
  const url = `${API_HOST}/maestros/getCiudadByDepartamento?departamento=${id}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getCultivos() {
  const url = `${API_HOST}/maestros/getCultivos`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function postCrearUsuario(body) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  const url = `${API_HOST}/usuario/crearUsuario`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getAutorizarTerminosYCondiciones(token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/usuario/autorizarTerminosYCondiciones`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getAutorizarPolitica(token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/usuario/autorizarPolitica`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getAuth(celular) {
  const url = `${API_HOST}/usuario/auth?telefono_celular=${celular}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function deleteUsuario(token) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', token);
  // var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    // body: raw,
    redirect: 'follow',
  };
  const url = `${API_HOST}/usuario/eliminar`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getConsultarUsuarioTelefono(celular) {
  const url = `${API_HOST}/usuario/consultarUsuarioTelefono?celular=${celular}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getConsultarUsuario(token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/usuario/consultarUsuario`;

  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getTerminos() {
  const url = `${API_HOST}/maestros/getTerminos`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getPolitica() {
  const url = `${API_HOST}/maestros/getPoliticas`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getFaq() {
  const url = `${API_HOST}/maestros/getFAQ`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function postCargarImagenBase64(token, body) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');
  var raw = body;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  const url = `${API_HOST}/maestros/cargarImagenBase64`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return "error de conexion";
    });
};

export function getConsultarPasoUsuario(token, ambiente) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/ambientes/consultarPasoUsuario?ambiente=${ambiente}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getGuardarPasoUsuario(token, ambiente) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/ambientes/guardarPasoUsuario?ambiente=${ambiente}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getTemario(token, ambiente, paso) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/ambientes/getTemario?ambiente=${ambiente}&paso=${paso}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}


// MÉTODO GETCUESTIONARIO POR AMBIENTE Y POR PASO
export function getCuestionario(token, ambiente, paso) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/ambientes/getCuestionarioPorAmbiente?ambiente=${ambiente}&paso=${paso}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getNovedades() {
  const url = `${API_HOST}/novedades/getNovedades`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getNoticias() {
  const url = `${API_HOST}/novedades/getNoticias`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return 'error de conexion';
    });
}

export function getConoceEmpresa() {
  const url = `${API_HOST}/novedades/getConoceNuestraEmpresa`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function postGuardarTestPresentado(token, body) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'POST',
    body: body,
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/ambientes/guardarTestPresentado`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getUltimoTestPresentado(ambiente, paso, token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/ambientes/getUltimoTestPresentado?ambiente=${ambiente}&paso=${paso}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getCantidadIntentosPorAmbienteYPaso(ambiente, paso, token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/ambientes/getCantidadIntetosPorAmbienteYPAso?ambiente=${ambiente}&paso=${paso}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.text();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function validarPasosTodosAmbientes(token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/ambientes/validarPasosTodosAmbientes`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function medallaQuintoAmbiente(token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/ambientes/medallaQuintoAmbiente`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function medallaContenidos(token) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/ambientes/medallaContenidos`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getTemarioById(token, id) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  myHeaders.append('Content-Type', '*/*');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const url = `${API_HOST}/ambientes/getTemarioById?id=${id}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function getLinksApps() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const url = `${API_HOST}/maestros/getLinksApps`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}



export function postGenerarCertificado(nombre,idAmbiente,fecha) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `https://app.tobiasbpa.co/birt/run?__format=pdf&__report=report/genericos/certificado.rptdesign&id=${idAmbiente}&nombre=${nombre}&fecha=${fecha}`;
  return fetch(url, requestOptions)
    .then((response) => {
      // console.log(response.json())
      return `https://app.tobiasbpa.co/birt/run?__format=pdf&__report=report/genericos/certificado.rptdesign&id=${idAmbiente}&nombre=${nombre}&fecha=${fecha}`;
      // return response.json()
    })
    // .then((result) => {
    //   return result;
    // })
    // .catch((err) => {
    //   console.log(err)
    //   return 'error de conexion';
    // });
}



export function consultarFechaCertificado(token, ambiente) {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const url = `${API_HOST}/usuario/consultarFechaCertificado?certificado=${ambiente}`;
  return fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
