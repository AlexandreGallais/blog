interface Point {
  x: number;
  y: number;
}

function addRoundedCorners(path: string, radius: number): string {
  if (radius === 0) {
    return path;
  }

  const commands = path
    .trim()
    .split(/[ML]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const points = commands.map((c) => {
    const [x, y] = c.split(/\s+/).map(Number);
    return { x, y } as { x: number; y: number };
  });

  if (points.length < 3) {
    return path;
  } // Rien à faire

  const result: string[] = [`M ${points[0]?.x} ${points[0]?.y}`];

  for (let i = 1; i < points.length - 1; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];

    if (!p0 || !p1 || !p2) {
      return '';
    }

    // Vecteurs
    const v1 = { x: p0.x - p1.x, y: p0.y - p1.y };
    const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };
    const len1 = Math.hypot(v1.x, v1.y);
    const len2 = Math.hypot(v2.x, v2.y);

    const nv1 = { x: v1.x / len1, y: v1.y / len1 };
    const nv2 = { x: v2.x / len2, y: v2.y / len2 };

    const angle = Math.acos(nv1.x * nv2.x + nv1.y * nv2.y) / 2;
    const tan = Math.tan(angle);
    const cutLength = Math.min(radius / tan, len1 / 2, len2 / 2);
    const effectiveRadius = cutLength * tan;

    const start: Point = {
      x: p1.x + nv1.x * cutLength,
      y: p1.y + nv1.y * cutLength,
    };

    const end: Point = {
      x: p1.x + nv2.x * cutLength,
      y: p1.y + nv2.y * cutLength,
    };

    const cross = nv1.x * nv2.y - nv1.y * nv2.x;
    const sweep = cross > 0 ? 0 : 1;

    result.push(`L ${start.x} ${start.y}`);
    result.push(
      `A ${effectiveRadius} ${effectiveRadius} 0 0 ${sweep} ${end.x} ${end.y}`,
    );
  }

  // Finir par la dernière ligne droite
  const last = points[points.length - 1];
  result.push(`L ${last?.x} ${last?.y}`);

  return result.join('\n');
}

const rawPath =
  'M 50 50 L 100 50 L 100 100 L 50 100 L 50 150 L 0 100 L 0 50 L 50 50';

export const getRect = () => addRoundedCorners(rawPath, 25);

// A ${r} ${r} 0 0 1 ${x + width} ${y + r}

/*
### **Commandes de base**
1. **M (Move To)** : Déplace le "stylet" (curseur) à un point sans tracer de ligne.
    - **Syntaxe** : `M x y`
    - Exemple : `M 10 20` déplace le curseur jusqu'à la position (10, 20).
    - **m** : (minuscule) déplace le stylet de manière relative par rapport à sa position actuelle.

2. **L (Line To)** : Trace une ligne droite jusqu'à un point spécifié.
    - **Syntaxe** : `L x y`
    - Exemple : `L 50 50` trace une ligne jusqu'au point (50, 50).
    - **l** : relative à la position actuelle.

3. **H (Horizontal Line To)** : Trace une ligne horizontale jusqu'à une position `x`.
    - **Syntaxe** : `H x`
    - Exemple : `H 100` trace une ligne horizontale vers `x = 100`.
    - **h** : relative.

4. **V (Vertical Line To)** : Trace une ligne verticale jusqu'à une position `y`.
    - **Syntaxe** : `V y`
    - Exemple : `V 200` trace une ligne verticale vers `y = 200`.
    - **v** : relative.

5. **Z (Close Path)** : Ferme le chemin en traçant une ligne jusqu'au point de départ (se connecte au point où vous avez utilisé `M`).
    - Pas de paramètres.
    - Exemple : `Z`

### **Commandes pour les courbes**
1. **C (Cubic Bézier Curve)** : Trace une courbe cubique définie par 2 points de contrôle et un point d'arrivée.
    - **Syntaxe** : `C x1 y1, x2 y2, x y`
    - `x1, y1` : premier point de contrôle.
    - `x2, y2` : second point de contrôle.
    - `x, y` : point d'arrivée.
    - **c** : relative.

2. **S (Cubic Bézier Curve with Smooth Control Points)** : Une variante de `C`. Le premier point de contrôle est calculé automatiquement en fonction du précédent.
    - **Syntaxe** : `S x2 y2, x y`
    - **s** : relative.

3. **Q (Quadratic Bézier Curve)** : Trace une courbe quadratique avec un seul point de contrôle.
    - **Syntaxe** : `Q x1 y1, x y`
    - `x1, y1` : point de contrôle.
    - `x, y` : point d'arrivée.
    - **q** : relative.

4. **T (Quadratic Bézier Curve with Smooth Control Points)** : Une variante de `Q`. Le point de contrôle est calculé automatiquement.
    - **Syntaxe** : `T x y`
    - **t** : relative.

### **Commandes pour les arcs**
1. **A (Arc)** : Trace une partie d'un cercle ou d'une ellipse (arc).
    - **Syntaxe** : `A rx ry x-axis-rotation large-arc-flag sweep-flag x y`
        - `rx` : rayon horizontal.
        - `ry` : rayon vertical.
        - `x-axis-rotation` : angle de rotation de l'ellipse (en degrés).
        - `large-arc-flag` : `0` ou `1`, dessine un petit ou un grand arc.
        - `sweep-flag` : `0` ou `1`, indique la direction de l'arc (horaire ou anti-horaire).
        - `x, y` : point d'arrivée.

    - **a** : relative.

### **Résumé des commandes**

| Commande | Action | Absolue/Relative |
| --- | --- | --- |
| `M` | Déplace le curseur | M/m |
| `L` | Ligne droite | L/l |
| `H` | Ligne horizontale | H/h |
| `V` | Ligne verticale | V/v |
| `Z` | Ferme le chemin | Z |
| `C` | Courbe de Bézier cubique | C/c |
| `S` | Courbe de Bézier cubique lissée | S/s |
| `Q` | Courbe de Bézier quadratique | Q/q |
| `T` | Courbe quadratique lissée | T/t |
| `A` | Arc elliptique/circulaire | A/a |

 */
