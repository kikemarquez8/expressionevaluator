function Pieza()
{
    /* Nivel en la expresión, a mayor valor, es mayor profundidad en la expresión */
    this.nivel;
    /* 1. Almacena un número, 2. Almacena un operador */
    this.tipo;
    /* El número en la expresión algebraica */
    this.numero;
    /* El operador (+, -, *, /, ^) en la expresión algebraica */
    this.operador;
    /* Determina si esta pieza ya ha sido evaluada en el momento de hacer los
 cálculos que determinan el valor de la expresión */
    this.evaluado;
    /* El resultado parcial de la evaluación de la expresión */
    this.acumula;
    /**
 * Constructor en caso que la pieza contenga un número real
 * @param numero Número de tipo double
 */
    this.ConstructorNumero = function(numero)
    {
        this.tipo = 1; //Es un número
        this.numero = numero;
        this.evaluado = false;
        this.acumula = numero;
    }
    /**
 * Constructor en caso que el nodo contenga un operador (+, -, *, /, ^)
 * @param operador Que puede ser +, -, *, /, ^
 */
    this.ConstructorOperador = function(operador, nivel)
    {
        this.tipo = 2; //Es un operador
        this.operador = operador;
        this.nivel = nivel;
        this.evaluado = false;
        this.acumula = 0;
    }

    /**
 * Constructor en caso que el nodo contenga una variable
 * @param variable Puede ir de 0 a 25 que representa de a..z
 * @param nivel Nivel en que se encuentra en la expresión este operador
 */
    this.ConstructorVariable = function(variable, nivel)
    {
        this.tipo = 3; //Es una variable
        this.variable = variable;
        this.nivel = nivel;
        this.evaluado = false;
        this.acumula = 0;
    }
    /**
 * Constructor en caso que la pieza contenga una función
 * @param funcion Identificación de la función
 * @param nivel Nivel en que se encuentra en la expresión este operador
 */
    this.ConstructorFuncion = function(funcion, nivel)
    {
        this.tipo = 4; //Es una función
        this.funcion = funcion;
        this.nivel = nivel;
        this.evaluado = false;
        this.acumula = 0;
    }
    /** Retorna el acumulado que tiene esta pieza
 * @return Acumulado de la pieza*/
    this.getAcumula = function()
    {
        return this.acumula;
    }
    /** Retorna si la pieza ya fue evaluada
 * @return True si la pieza ya fue evaluada
 */
    this.isEvaluado = function()
    {
        return this.evaluado;
    }
    /**
 * Retorna el número de tipo double que tiene la pieza
 * @return El valor del número tipo double
 */
    this.getNumero = function()
    {
        return this.numero;
    }
    /**
 * Retorna el operador (+, -, *, /, ^) que tiene la pieza
 * @return El operador en char
 */
    this.getOperador = function()
    {
        return this.operador;
    }

    /**
 * Retorna la variable que tiene la pieza
 * @return La variable
 */
    this.getVariable = function()
    {
        return this.variable;
    }
    /**
 * Retorna que tipo de pieza es: número u operador
 * @return Tipo de pieza
 */
    this.getTipo = function()
    {
        return this.tipo;
    }
    /**
 * Retorna en que nivel se encuentra la pieza con respecto a la expresión
 * @return Nivel
 */
    this.getNivel = function()
    {
        return this.nivel;
    }
    /**
 * Retorna el código de la función (abs, sen, cos, tan) que tiene la pieza
 * @return Código de la función
 */
    this.getFuncion = function()
    {
        return this.funcion;
    }

    /**
 * Da valor al acumulado por pieza
 * @param acumulado Acumulado que nace de cada operación simple es dado a la pieza aquí.
 */
    this.setAcumula = function(acumulado)
    {
        this.acumula = acumulado;
    }
    /**
 * Marca la pieza como ya evaluada
 * @param evaluado true si la pieza ya ha sido evaluada, false si no
 */
    this.setEvaluado = function(evaluado)
    {
        this.evaluado = evaluado;
    }
}
function EvaluadorExpresionAlgebraica()
/**
* Evaluador de expresiones algebraicas.
* Recibe la expresión algebraica por ejemplo: "sin(x)+cos(y)*3.14"
* como una cadena (String) junto con el valor de las variables (x=8.92, y=-7.43)
* el algoritmo interpreta esa expresión respetando las reglas
* algebraicas y retorna el resultado de tipo double.
*
* @author Rafael Alberto Moreno Parra
* Correo: ramsoftware@gmail.com
* Página Web: http://darwin.50webs.com
* Licencia: LGPL
* Fecha: Mayo de 2011
*/
{
    /**
 * Constantes para determinar que tipo es cada pieza en que se divide la expresión algebraica
 */
    this.ESNUMERO = 1;
    this.ESOPERADOR = 2;
    this.ESVARIABLE = 3;
    this.ESFUNCION = 4;
    /**
 * Esta constante sirve para que se reste al carácter y se obtenga el número
 * usado en el arreglo unidimensional que alberga los valores de las variables
 * Ejemplo: 'b' - ASCIILETRA = 1
 */
    this.ASCIILETRA = 97;
    /**
 * Las funciones que soporta este evaluador
 */
    this.TAMANOFUNCION = 39;
    this.listaFunciones = "sinsencostanabsasnacsatnlogceiexpsqrrcb";
    /**
 * Lista simplemente enlazada que tiene los componentes (número, operador o función)
 * de la expresión algebraica ya dividida.
 */
    this.Piezas = [];
    /**
 * Arreglo unidimensional con las 26 variables diferentes
 */
    this.valorVariable = [];
    /**
 * Almacena hasta que nivel se llega en paréntesis internos
 */
    this.MaximoNivel;
    /**
 * Variable que se pone a true cuando hay un error matemático
 */
    this.ERRORMATEMATICO;
    /**
 * Este método se encarga de analizar la expresión y convertirla en una
 * estructura que permita evaluar la expresión.
 *
 * Convierte una expresión algebraica en una sucesión de nodos.
 * |2| |+| |a| |/| |5| |*| |cos| |y|
 *
 * @param expr La expresión algebraica sin espacios y en minúsculas
 */
    this.Analizar = function(expr)
    {
        /* Inicializa la lista de piezas */
        this.Piezas.length = 0;
        NumeroPieza = 0;
        /* Inicializa el nivel */
        nivel = 0;
        this.MaximoNivel = 0;
        /* Tamaño de la expresión simple */
        longitud = expr.length;
        /* Conversión de string a double */
        entero = 0;
        fraccion = 0;
        divide = 1;
        puntoentero = false;
        /* Si llevaba acumulando un valor numérico esta variable se vuelve true */
        acumulabaNumero = false;
        for (cont=0; cont<longitud; cont++){
            /* Trae la letra */
            letra = expr.charAt(cont);
            /* Si hay un paréntesis que abre, el nivel aumenta */
            if (letra=='(')
            {
                nivel++;
                if (nivel>this.MaximoNivel) this.MaximoNivel = nivel;
            }
            /* Si es paréntesis que cierra, el nivel disminuye */
            else if (letra==')')
                nivel--;
            /* Si es una variable o una función */
            else if (letra >= 'a' && letra <= 'z')
            {
                /* Detecta si es una función porque tiene dos letras seguidas */
                if (cont < longitud-1)
                {
                    /* Chequea si el siguiente carácter es una letra, dado el caso es una función */
                    letra2 = expr.charAt(cont+1);
                    if ( letra2 >= 'a' && letra2 <= 'z')
                    {
                        letra3 = expr.charAt(cont+2);
                        /* Identifica las funciones */
                        funcionDetectada = 1;
                        for (funcion = 0; funcion <= this.TAMANOFUNCION; funcion += 3)
                        {
                            if (letra == this.listaFunciones.charAt(funcion)
                                && letra2 == this.listaFunciones.charAt(funcion + 1)
                                && letra3 == this.listaFunciones.charAt(funcion + 2))
                                break;
                            funcionDetectada++;
                        }
                        /* Adiciona a la lista */
                        objeto = new Pieza();
                        objeto.ConstructorFuncion(funcionDetectada, nivel);
                        this.Piezas[NumeroPieza++] = objeto;
                        nivel++;
                        if (nivel>this.MaximoNivel) this.MaximoNivel = nivel;
                        /* Mueve tres caracteres sin( [s][i][n][(] */
                        cont+=3;
                    }
                    /* Es una variable, no una función */
                    else
                    {
                        objeto = new Pieza();
                        objeto.ConstructorVariable(letra - this.ASCIILETRA, nivel);
                        this.Piezas[NumeroPieza++] = objeto;
                    }
                }
                /* Es una variable, no una función */
                else
                {
                    objeto = new Pieza();
                    objeto.ConstructorVariable(letra - this.ASCIILETRA, nivel);
                    this.Piezas[NumeroPieza++] = objeto;
                }
            }
            /* Si es un número */
            else if( (letra >= '0' && letra <= '9') || letra == '.')
            {
                /* Ir armando el número de tipo double */
                if (letra == '.')
                    puntoentero = true;
                else
                    if(!puntoentero) /* puntoentero == false */
                        entero = entero * 10 + parseFloat(letra);
                else
                {
                    fraccion = fraccion * 10 + parseFloat(letra);
                    divide *=10;
                }
                acumulabaNumero = true;
            }
            else
            {
                /* Si es un operador entonces crea el nodo del operador y el
 nodo del número si venía acumulando un número */
                if (acumulabaNumero)
                {
                    /* El nodo del número */
                    objeto = new Pieza();
                    objeto.ConstructorNumero(entero + fraccion/divide, nivel);
                    this.Piezas[NumeroPieza++] = objeto;
                }
                /* El nodo operador */
                objeto = new Pieza();
                objeto.ConstructorOperador(letra, nivel);
                /* Agrega a la lista */
                this.Piezas[NumeroPieza++] = objeto;
                /* Inicializa de nuevo las variables de conversión de string a número */
                entero = fraccion = 0;
                divide = 1;
                puntoentero = acumulabaNumero = false;
            }
        }
        /* Cierra la expresión simple preguntando si el último operando es un número */
        if (acumulabaNumero)
        {
            objeto = new Pieza();
            objeto.ConstructorNumero(entero + fraccion/divide, nivel);
            this.Piezas[NumeroPieza++] = objeto;
        }
    }
    /**
 * Ya construida la lista del tipo:
 * [nodo número] [nodo operador] [nodo número] [nodo operador] .....
 * es ir del operador con mas precedencia al de menos precedencia.
 *
 * Este método se llama después de haber sido analizada la expresión.
 *
 * En el caso que sólo cambia el valor de una variable, no es necesario
 * analizar de nuevo la expresión, luego es muy rápido evaluar múltiples veces
 * la misma expresión.
 *
 * @return El valor de la expresión evaluada (double)
 */
    this.Evaluar = function()
    {
        pos=0, antes=0, sigue=0;
        ERRORMATEMATICO = false;
        /* Total de nodos en la lista creada */
        totalPiezas = this.Piezas.length;
        for (pos=0; pos<totalPiezas; pos++)
        {
            /* Activa todas las piezas para que sean evaluadas */
            this.Piezas[pos].setEvaluado(false);
            /* Recorre toda la lista poniendo los valores de las variables en el acumulado de cada pieza.
 ¿Cómo? Extrae el valor del arreglo unidimensional que alberga los valores de las variables. */
            if (this.Piezas[pos].getTipo() == this.ESVARIABLE)
                this.Piezas[pos].setAcumula(this.valorVariable[this.Piezas[pos].getVariable()]);
            else if (this.Piezas[pos].getTipo() == this.ESNUMERO)
                this.Piezas[pos].setAcumula(this.Piezas[pos].getNumero());
        }
        /* Va del nivel mas profundo al mas superficial */
        for (evaluaNivel = this.MaximoNivel; evaluaNivel >= 0; evaluaNivel--)
        {
            /* Recorre toda la lista */
            for (pos=0; pos<totalPiezas; pos++)
            {
                /* Si encuentra una pieza de tipo función la evalúa con el valor de la siguiente pieza */
                if (this.Piezas[pos].getNivel() == evaluaNivel && this.Piezas[pos].getTipo() == this.ESFUNCION )
                {
                    switch (this.Piezas[pos].getFuncion())
                    {
                        case 1:
                        case 2:
                            this.Piezas[pos].setAcumula(Math.sin(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 3:
                            this.Piezas[pos].setAcumula(Math.cos(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 4:
                            this.Piezas[pos].setAcumula(Math.tan(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 5:
                            if (this.Piezas[pos+1].getAcumula() > 0)
                                this.Piezas[pos].setAcumula(this.Piezas[pos+1].getAcumula());
                            else
                                this.Piezas[pos].setAcumula(-this.Piezas[pos+1].getAcumula());
                            break;
                        case 6:
                            if (this.Piezas[pos+1].getAcumula() >= -1 && this.Piezas[pos+1].getAcumula() <= 1)
                                this.Piezas[pos].setAcumula(Math.asin(this.Piezas[pos+1].getAcumula()));
                            else
                            {
                                ERRORMATEMATICO = true;
                                return 0;
                            }
                            break;
                        case 7:
                            if (this.Piezas[pos+1].getAcumula() >= -1 && this.Piezas[pos+1].getAcumula() <= 1)
                                this.Piezas[pos].setAcumula(Math.acos(this.Piezas[pos+1].getAcumula()));
                            else
                            {
                                ERRORMATEMATICO = true;
                                return 0;
                            }
                            break;
                        case 8:
                            this.Piezas[pos].setAcumula(Math.atan(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 9:
                            this.Piezas[pos].setAcumula(Math.log(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 10:
                            this.Piezas[pos].setAcumula(Math.ceil(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 11:
                            this.Piezas[pos].setAcumula(Math.exp(this.Piezas[pos+1].getAcumula()));
                            break;
                        case 12:
                            if (this.Piezas[pos+1].getAcumula() >= 0)
                                this.Piezas[pos].setAcumula(Math.sqrt(this.Piezas[pos+1].getAcumula()));
                            else
                            {
                                ERRORMATEMATICO = true;
                                return 0;
                            }
                            break;
                        case 13:
                            this.Piezas[pos].setAcumula(Math.pow(this.Piezas[pos+1].getAcumula(), 1 / 3));
                            break;
                    }
                    /* Marca el nodo siguiente como ya evaluado */
                    this.Piezas[pos+1].setEvaluado(true);
                }
            }
            /* Recorre toda la lista */
            for (pos=0; pos<totalPiezas; pos++)
            {
                /* Si encuentra un nodo del tipo operador y es exponente */
                if (this.Piezas[pos].getNivel() == evaluaNivel && this.Piezas[pos].getTipo() == this.ESOPERADOR &&
                    this.Piezas[pos].getOperador() == '^')
                {
                    /* Busca un nodo anterior que sea número o variable y no haya sido evaluado */
                    for (antes=pos-1; this.Piezas[antes].isEvaluado(); antes--);
                    /* Busca un nodo siguiente que sea número o variable y no haya sido evaluado */
                    for (sigue=pos+1; this.Piezas[sigue].isEvaluado(); sigue++);
                    /* Marca esos nodos actual y siguiente como ya evaluados */
                    this.Piezas[pos].setEvaluado(true);
                    this.Piezas[sigue].setEvaluado(true);
                    /* Hace la operación de Número elevado a Número */
                    this.Piezas[antes].setAcumula(Math.pow(this.Piezas[antes].getAcumula(), this.Piezas[sigue].getAcumula()));
                }
            }
            /* Recorre toda la lista */
            for (pos=0; pos<totalPiezas; pos++)
            {
                /* Si encuentra un nodo del tipo operador y es multiplicación o división */
                if (this.Piezas[pos].getNivel() == evaluaNivel && this.Piezas[pos].getTipo() == this.ESOPERADOR &&
                    (this.Piezas[pos].getOperador() == '*' || this.Piezas[pos].getOperador() == '/'))
                {
                    /* Busca un nodo anterior que sea número o variable y no haya sido evaluado */
                    for (antes=pos-1; this.Piezas[antes].isEvaluado(); antes--);
                    /* Busca un nodo siguiente que sea número o variable y no haya sido evaluado */
                    for (sigue=pos+1; this.Piezas[sigue].isEvaluado(); sigue++);
                    /* Marca esos nodos actual y siguiente como ya evaluados */
                    this.Piezas[pos].setEvaluado(true);
                    this.Piezas[sigue].setEvaluado(true);
                    /* Hace la operación de Número * Número, o Número / Número */
                    if (this.Piezas[pos].getOperador() == '*')
                        this.Piezas[antes].setAcumula( this.Piezas[antes].getAcumula() * this.Piezas[sigue].getAcumula() );
                    else
                    {
                        if (this.Piezas[sigue].getAcumula() != 0)
                            this.Piezas[antes].setAcumula( this.Piezas[antes].getAcumula() / this.Piezas[sigue].getAcumula() );
                        else
                        {
                            ERRORMATEMATICO = true;
                            return 0;
                        }
                    }
                }
            }
            /* Recorre toda la lista */
            for (pos=0; pos<totalPiezas; pos++)
            {
                /* Si encuentra un nodo del tipo operador y es suma o resta */
                if (this.Piezas[pos].getNivel() == evaluaNivel && this.Piezas[pos].getTipo() == this.ESOPERADOR &&
                    (this.Piezas[pos].getOperador() == '+' || this.Piezas[pos].getOperador() == '-'))
                {
                    /* Busca un nodo anterior que sea número o variable y no haya sido evaluado */
                    for (antes=pos-1; this.Piezas[antes].isEvaluado(); antes--);
                    /* Busca un nodo siguiente que sea número o variable y no haya sido evaluado */
                    for (sigue=pos+1; this.Piezas[sigue].isEvaluado(); sigue++);
                    /* Marca esos nodos actual y siguiente como ya evaluados */
                    this.Piezas[pos].setEvaluado(true);
                    this.Piezas[sigue].setEvaluado(true);
                    /* Hace la operación de Número + Número, o Número - Número */
                    if (this.Piezas[pos].getOperador() == '+')
                        this.Piezas[antes].setAcumula( this.Piezas[antes].getAcumula() + this.Piezas[sigue].getAcumula() );
                    else
                        this.Piezas[antes].setAcumula( this.Piezas[antes].getAcumula() - this.Piezas[sigue].getAcumula() );
                }
            }
        }
        /* Resultado de la expresión */
        return this.Piezas[0].getAcumula();
    }
    /**
 * Guarda en un arreglo unidimensional el valor de las variables
 * @param variable ¿Qué variable de la expresión recibirá el valor? a..z
 * @param valor Valor de tipo double que tendrá esa variable.
 */
    this.DarValorVariable = function(variable, valor)
    {
        this.valorVariable[variable - this.ASCIILETRA] = valor;
    }
    /**
 * Retorna true si hubo un error matemático
 * @return TRUE si hubo un error matemático
 */
    this.getErrorMatematico = function()
    {
        return ERRORMATEMATICO;
    }
}