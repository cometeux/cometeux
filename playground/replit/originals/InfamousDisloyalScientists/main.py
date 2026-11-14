import turtle

t = turtle.Turtle()
t.screen.bgcolor("dark salmon")
t.color("maroon")
t.speed(90)
for i in range(20) :
  t.circle(50)

  t.fd(20)
  t.rt(10)

  t.fd(20)
  t.rt(10)
turtle.done()