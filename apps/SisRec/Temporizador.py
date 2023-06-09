from datetime import datetime, timedelta
from threading import Thread
from time import sleep

class Temporizador(Thread):
    def __init__(self, hora, delay, funcion):
        # El constructor recibe como parámetros:
        ## hora = en un string con formato hh:mm:ss y es la hora a la que queremos que se ejecute la función.
        ## delay = tiempo de espera entre comprobaciones en segundos.
        ## funcion = función a ejecutar.

        super(Temporizador, self).__init__()
        self._estado = True
        self.hora = hora
        self.delay = delay
        self.funcion = funcion

    def stop(self):
        self._estado = False

    def run(self):
        # Pasamos el string a dato tipo datetime
        aux = datetime.strptime(self.hora, '%H:%M:%S')
        # Obtenemos la fecha y hora actuales.
        hora = datetime.now()
        # Sustituimos la hora por la hora a ejecutar la función.
        hora = hora.replace(hour = aux.hour, minute=aux.minute, second=aux.second, microsecond = 0)
        # Comprobamos si la hora ya a pasado o no, si ha pasado sumamos un dia (hoy ya no se ejecutará).
        if hora <= datetime.now():
            hora += timedelta(days=1)
        print("")
        print("Hilo de trabajo para entrenamiento de la red neuronal Iniciada, Origen del proceso:  Cienciometrico/urls.py, line 22")
        print('Proxima ejecución programada el {0} a las {1}'.format(hora.date(),  hora.time()))
        print("")

        # Iniciamos el ciclo:
        while self._estado:
            # Comparamos la hora actual con la de ejecución y ejecutamos o no la función.
            ## Si se ejecuta sumamos un dia a la fecha objetivo.
            if hora <= datetime.now():
                self.funcion()
                print("")
                print(' Ultima Ejecución programada ejecutada el {0} a las {1}'.format(hora.date(),  hora.time()))
                hora += timedelta(days=1)
                print('Próxima ejecución programada el {0} a las {1}'.format(hora.date(),  hora.time()))
                print("")

            # Esperamos x segundos para volver a ejecutar la comprobación.
            sleep(self.delay)

        #Si usamos el método stop() salimos del ciclo y el hilo terminará.
        else:
             print('Ejecución automática finalizada')
