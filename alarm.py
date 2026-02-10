import tkinter as tk
import datetime, time, threading, os, sys, pygame

# ===== SETTINGS =====
ALARM_TIME = None
SNOOZE_MINUTES = 5
get_path = lambda x: os.path.join(getattr(sys, '_MEIPASS', os.path.abspath('.')), x)
MUSIC_FILE = get_path("webSitepage/4.mp3")
WINDOW_WIDTH, WINDOW_HEIGHT = 600, 400

# ===== FUNCTIONS =====
def set_alarm():
    try:
        h, m = map(int, entry.get().split(":"))
        if am_pm_var.get() == "PM" and h != 12:
            h += 12
        elif am_pm_var.get() == "AM" and h == 12:
            h = 0
        global ALARM_TIME
        ALARM_TIME = datetime.time(h, m)
        alarm_label.config(text=f"ALARM SET FOR: {ALARM_TIME.strftime('%I:%M %p')}")
        threading.Thread(target=check_alarm, daemon=True).start()
    except ValueError:
        alarm_label.config(text="Invalid time. Example: 02:45")

def check_alarm():
    global ALARM_TIME
    while ALARM_TIME:
        if datetime.datetime.now().time() >= ALARM_TIME:
            alarm_label.config(text="RINGING!")
            play_alarm_sound()
            break
        time.sleep(1)
    ALARM_TIME = None

def play_alarm_sound():
    try:
        pygame.mixer.init()
        pygame.mixer.music.load(MUSIC_FILE)
        pygame.mixer.music.play(-1)
    except pygame.error as e:
        print(f"Sound error: {e}")
        alarm_label.config(text=f"Sound error: {e}")

def snooze_alarm():
    stop_sound()
    global ALARM_TIME
    ALARM_TIME = (datetime.datetime.now() + datetime.timedelta(minutes=SNOOZE_MINUTES)).time()
    alarm_label.config(text=f"Snoozed until {ALARM_TIME.strftime('%I:%M %p')}")
    threading.Thread(target=check_alarm, daemon=True).start()

def exit_alarm():
    stop_sound()
    window.destroy()

def stop_sound():
    if pygame.mixer.get_init():
        pygame.mixer.music.stop()
        pygame.mixer.quit()

# ===== WINDOW =====
window = tk.Tk()
window.title("Alarm Clock GUI")
window.configure(bg="blue")
window.geometry(f"{WINDOW_WIDTH}x{WINDOW_HEIGHT}")

# ===== SINGLE FRAME (no left frame for image) =====
main_frame = tk.Frame(window, bg="blue")
main_frame.pack(fill="both", expand=True, padx=20, pady=20)

# ===== RIGHT SIDE UI (only frame now) =====
alarm_label = tk.Label(main_frame, text="Enter alarm time (HH:MM)",
                       font=("Arial", 16), bg="white", fg="blue")
alarm_label.pack(pady=20)

entry = tk.Entry(main_frame, width=10, font=("Helvetica", 24), bg="white", fg="blue")
entry.pack(pady=10)

am_pm_var = tk.StringVar(value="AM")
am_pm_menu = tk.OptionMenu(main_frame, am_pm_var, "AM", "PM")
am_pm_menu.config(font=("Arial", 16))
am_pm_menu.pack(pady=5)

# ===== BUTTONS =====
button_args = dict(font=("Arial", 16), width=10)
buttons = [
    ("Set Alarm", set_alarm, "purple"),
    ("Snooze", snooze_alarm, "orange"),
    ("Exit", exit_alarm, "red")
]

for text, cmd, bg in buttons:
    tk.Button(main_frame, text=text, command=cmd, bg=bg, fg="white", **button_args).pack(pady=10)

window.mainloop()
