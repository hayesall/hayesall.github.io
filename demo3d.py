import matplotlib.pyplot as plt
from math import log
import numpy as np
from matplotlib import cm
from matplotlib.ticker import LinearLocator



def entropy(pos: int, neg: int) -> float:
    """Compute binary entropy."""
    if (not pos) or (not neg):
        return 0.0
    total = pos + neg
    left = pos / total
    right = neg / total
    return -1.0 * left * log(left, 2) - right * log(right, 2)


if __name__ == "__main__":

    fig, ax = plt.subplots(subplot_kw={"projection": "3d"})

    poss = np.arange(0, 10, step=0.1)
    negs = np.arange(0, 10, step=0.1)

    poss, negs = np.meshgrid(poss, negs)

    ents = np.zeros(poss.shape)

    for iy, ix in np.ndindex(ents.shape):
        ents[iy, ix] = entropy(poss[iy, ix], negs[iy, ix])

    surf = ax.plot_surface(poss, negs, ents, cmap=cm.coolwarm)

    plt.show()
