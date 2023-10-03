import time
from machine import Pin, I2C
from segment_display import display
import neopixel
import math



if __name__ == '__main__':
    clock = display(16, 3)
    while(True):
        while (True):
            for cur in range(1000):
                clock.fillNum(cur, (50, 50, 50))
                time.sleep(0.1)
