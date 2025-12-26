import tkinter as tk
from tkinter import font
import random
import sys

# Textos aleatorios
TEXTOS = [
    "HAS SIDO HACKEADO",
    "ACCESO NO AUTORIZADO",
    "TU SISTEMA ESTA SIENDO OBSERVADO",
    "ERROR CRITICO DEL SISTEMA",
    "NO INTENTES CERRAR ESTA VENTANA",
    "PROCESO DESCONOCIDO EN EJECUCION"
]

ANCHO = 350
ALTO = 150
MAX_VENTANAS = 50

contador_ventanas = 0
ventanas_abiertas = []

# Obtener tamaño de pantalla
root = tk.Tk()
root.withdraw()  # Oculta la ventana principal
SCREEN_WIDTH = root.winfo_screenwidth()
SCREEN_HEIGHT = root.winfo_screenheight()

def texto_aleatorio():
    return random.choice(TEXTOS)

def cerrar_todo_y_salir():
    for ventana in ventanas_abiertas:
        ventana.destroy()
    sys.exit(0)

def crear_ventana(titulo):
    global contador_ventanas

    if contador_ventanas >= MAX_VENTANAS:
        cerrar_todo_y_salir()
        return

    ventana = tk.Toplevel()
    ventana.title(titulo)
    ventana.geometry(f"{ANCHO}x{ALTO}+{random.randint(0, SCREEN_WIDTH - ANCHO)}+{random.randint(0, SCREEN_HEIGHT - ALTO)}")
    ventana.configure(bg="black")

    label = tk.Label(ventana, text=texto_aleatorio(), fg="red", bg="black", font=("Arial", 16, "bold"))
    label.pack(expand=True)

    ventanas_abiertas.append(ventana)
    contador_ventanas += 1

    if contador_ventanas >= MAX_VENTANAS:
        cerrar_todo_y_salir()
        return

    # Al intentar cerrar la ventana
    def on_close():
        crear_ventana("Nueva Ventana")
        crear_ventana("Nueva Ventana")
        # La ventana original permanece abierta
    ventana.protocol("WM_DELETE_WINDOW", on_close)

# Crear ventana inicial
crear_ventana("Ventana Inicial")

# Ejecutar loop principal
root.mainloop()
