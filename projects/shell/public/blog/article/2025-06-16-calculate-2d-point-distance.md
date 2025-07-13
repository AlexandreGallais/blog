---
title: How to calculate the distance between two points in a 2D plane
author: Alexandre Gallais
date: "2025-06-16"
keywords:
  - distance
  - 2D geometry
  - vector
  - Pythagorean theorem
tags:
  - math
  - geometry
---

# How to calculate the distance between two points in a 2D plane

## Define the coordinates of the two points

We start with two points on the Cartesian plane. Each point has an $x$ and a $y$ coordinate.

$A = (x_1, y_1) = (6, 12)$  
$B = (x_2, y_2) = (3, 16)$

## Create the vector between the two points

We compute the vector $\vec{AB}$ from point $A$ to point $B$:

$
\vec{AB} = \begin{pmatrix} x_2 - x_1 \\ y_2 - y_1 \end{pmatrix}
= \begin{pmatrix} 3 - 6 \\ 16 - 12 \end{pmatrix}
= \begin{pmatrix} -3 \\ 4 \end{pmatrix}
$

This vector represents the displacement from $A$ to $B$.

## Build a right triangle using the vector

The vector $\vec{AB}$ can be seen as the diagonal (hypotenuse) of a right triangle.  
The triangle’s legs are the horizontal and vertical components:

- horizontal leg: $|\Delta x| = |x_2 - x_1| = 3$
- vertical leg: $|\Delta y| = |y_2 - y_1| = 4$

## Calculate the distance using the Pythagorean theorem

The distance between the two points is the length of the vector $\vec{AB}$, which is the hypotenuse of the triangle:

$
\text{distance} = |\vec{AB}| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \sqrt{(-3)^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5
$

## General formula

For any two points $A = (x_1, y_1)$ and $B = (x_2, y_2)$, the distance $d$ is given by:

$
d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}
$


