import time
import sys

def animasi(text, delay=0.1):
    """Menampilkan teks satu per satu seperti mesin tik."""
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()

def sing_song():
    # Daftar tuple: (delay_sebelum_lirik, teks_lirik, kecepatan_animasi)
    lyrics = [
        (0.3, "okhe fang na", 0.08),
        (1.1, "khue rueang man baep aya ngngi", 0.06),
        (0.1, "man ru wa thoe chop khon talok", 0.04),
        (0.1, "ko loei tong fuek len muk tloet", 0.04),
        (0.1, "oeik", 0.008),   
        (0.1, "fuek len muk talat", 0.03),   
        (0.1, "oei", 0.008),   
        (0.1, "fuek len muk talot", 0.05),   
        (0.1, "mairu wa thoe ca chop man", 0.06),   
        (0.1, "haima tha man pen khon mai khoi taluk", 0.04),   
        (0.1, "oei", 0.008),   
        (0.1, "khon mai khoi talok ", 0.04),   
        (0.1, "oei", 0.008),   
        (0.1, "hey thuk laeo\n", 0.05),   
    ]

    for delay, lyric, speed in lyrics:
        time.sleep(delay)
        animasi(lyric, speed)

if __name__ == "__main__":
    sing_song()
