# <!-- copyright Jordan Moore (jmoore143) -->
import neopixel
import math
from machine import Pin

class display:
    nums =  [
        [0,1,2,4,5,6],
        [2,6],
        [1,2,3,4,5],
        [1,2,3,5,6],
        [0,2,3,6],
        [0,1,3,5,6],
        [0,1,3,4,5,6],
        [1,2,6],
        [0,1,2,3,4,5,6],
        [0,1,2,3,5,6]
    ]
    segments = 0
    pixels = 0
    def __init__(self, pin, count):
        self.pixels = neopixel.NeoPixel(Pin(pin), count * 7)
        self.segments = count

    def clearDisplay(self):
        for p in range(self.segments * 7):
            self.pixels[p] = (0,0,0)

    def clearSegment(start, end = -1):
        if(end == -1):
            end = start
        for i in range(end-start):
            for p in range(7):
                self.pixels[start + p + ((i - 1) * 7)] = (0,0,0)

    def setNum(self, segment, num, color):
        segment = int(segment)
        num = int(num)
        if(segment > self.segments or segment < 0):
            try:
                raise Exception("segment out of bounds")
            except:
                return
        if(num > 9 or num < 0):
            try:
                raise Exception("number must be between 0 and 9")
            except:
                return

        for p in range(7):
            self.pixels[p + ((segment - 1) * 7)] = (0,0,0)

        for i in self.nums[num]:
            self.pixels[i + ((segment - 1) * 7)] = color
        self.pixels.write()

    def fillNum(self, num, color, offset = 0, clear = False):
        if(clear):
            self.clearDisplay()
        # print(list(str(num)))
        if(len(str(num)) - offset > self.segments):
            try:
                raise Exception("number too large for current display")
            except:
                return
        seg = self.segments - (len(str(num)) - 1) + offset
        for n in list(str(num)):
            self.setNum(seg, int(n), color)
            seg = seg + 1
