

export  const  Validation = {

    email :{

        presence :{

            message:'please enter email'
        },

        format :{

            pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            message: "please enter the valid Email Address"



        }
    },

    password :{

         presence:{


             message: 'please enter the password'


         },








    }



}


export  function validdte(namefield,value) {





}
