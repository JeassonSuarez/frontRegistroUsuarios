import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";


export const Registro = () => {


  const initialCredentials = { 
    tipoUsuario: '',
    cedula:'',
    nombre:'',
    apellido:'',
    correo:'',
    password:'',
    fNacimiento:'',
    sexo:'',
    telefono:'',
  }

  const registroEsquema = Yup.object().shape(
    {
        tipoUsuario: Yup.string().oneOf(['estudiante', 'profesor', 'medico', 'administrativo']).required("Debe seleccionar un tipo de usuario"),
        cedula: Yup.string().required("Debe ingresar su numero de identidad"),
        nombre: Yup.string().required('Debe ingresar un nombre'),
        apellido: Yup.string().required('Debe ingresar un apellido'),
        correo: Yup.string().required('Debe ingresar un correo').email('Formato de correo invalido'),
        password: Yup.string().required('Debe ingresar una contraseña'),
        fNacimiento: Yup.string().required('Seleccione su fecha de nacimeinto'),
        telefono: Yup.string().required('Debe ingresar un numero de telefono'),
        sexo: Yup.string().required('Debe ingresar un numero de telefono').oneOf(['masculino', 'femenino', 'otro']),
    }
  );

  return (
    <div className='div-registro'>
      <Formik
        initialValues={ initialCredentials }
        validationSchema={ registroEsquema }
        onSubmit={async (values, { setSubmitting }) => {
          fetch('http://localhost:3000/usuario', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(values)
          })
          .then(response => response.json())
          .then(response => {
            console.log(response);
          })

          console.log(values)
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
      {({ values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur }) => (
            <Form className='form-filtro-asignacionCitas'>

              <label htmlFor="tipoUsuario">Tipo de usuario:</label>
              <Field component="select" id="tipoUsuario" name="tipoUsuario" className='select'>
              <option value="">Selecciones una tipo de usuario</option>
                <option value="profesor">Profesor</option>
                <option value="estudiante">Estudiante</option>
                <option value="administrativo">Administrativo</option>
                <option value="medico">Medico</option>
              </Field>
              {/* levelTask errors */}
              {
                  errors.tipoUsuario && touched.tipoUsuario &&
                  (
                      <ErrorMessage component='div' name='tipoUsuario' className='errorM' />
                  )
              }

              <label htmlFor='cedula'>Cedula:</label>
              <Field id='cedula' name='cedula' placeholder='cedula' type='number' />
              {/* description errors */}
              {
                  errors.cedula && touched.cedula &&
                  (
                      <ErrorMessage component='div' name='cedula' className='errorM' />
                  )
              }

              <label htmlFor='nombre'>Nombre:</label>
              <Field id='nombre' name='nombre' placeholder='nombre' type='text' />
              {/* description errors */}
              {
                  errors.nombre && touched.nombre &&
                  (
                      <ErrorMessage component='div' name='nombre' className='errorM' />
                  )
              }

              <label htmlFor='apellido'>Nombre:</label>
              <Field id='apellido' name='apellido' placeholder='apellido' type='text' />
              {/* description errors */}
              {
                  errors.apellido && touched.apellido &&
                  (
                      <ErrorMessage component='div' name='apellido' className='errorM'/>
                  )
              }

              <label htmlFor='correo'>Email:</label>
              <Field id='correo' name='correo' placeholder='example@gmail.com' type='email' />

              {/* email errors */}
              {
                  errors.correo && touched.correo &&
                  (
                      <ErrorMessage component='div' name='correo' className='errorM' />
                  )
              }

              <label htmlFor='password'>Password:</label>
              <Field id='password' name='password' type='password' placeholder='password' />
              {/* password errors */}
              {
                  errors.password && touched.password && 
                  (
                      <ErrorMessage component='div' name='password' className='errorM' />
                  )
              }

              <label htmlFor='fNacimiento'>Fecha de nacimeitno:</label>
              <Field id='fNacimiento' name='fNacimiento' type='date' />
              {/* password errors */}
              {
                  errors.fNacimiento && touched.fNacimiento && 
                  (
                      <ErrorMessage component='div' name='fNacimiento' className='errorM' />
                  )
              }
              
              <label htmlFor='telefono'>Numero telefonico:</label>
              <Field id='telefono' name='telefono' type='number' />
              {/* password errors */}
              {
                  errors.telefono && touched.telefono && 
                  (
                      <ErrorMessage component='div' name='telefono' className='errorM'/>
                  )
              }

              <label htmlFor="sexo">Sexo:</label>
              <Field component="select" id="sexo" name="sexo" className='select'>
              <option value="">Selecciones sexo</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="otro">Otro</option>
              </Field>
              {/* levelTask errors */}
              {
                  errors.sexo && touched.sexo &&
                  (
                      <ErrorMessage component='div' name='sexo' className='errorM'/>
                  )
              }
              
              <button type='submit' style={{marginTop:'15px'}}>Registrar</button>
            </Form>
        )}
      </Formik>
    </div>
  );
};