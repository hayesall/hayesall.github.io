---
layout: article
title: "Sequential k-Means Clustering on Gifs (with Animations)"
description:
date: 2018-10-28
excerpt: k-means clustering can be used on images to automatically perform color quantization. This demonstrates how to cluster colors in an animation.
categories: blog
tags: ["machine-learning"]
redirect_from:
  - /kmeans-clustering-gifs/
image:
  teaser: teaser/kmeans_teaser.png
---

One of the common demonstrations for k-means clustering is as a pre-processing step for image segmentation, or as an automatic way to perform color quantization.

The natural next step seemed like it would involve using the same techniques on video. I did not find anything online which currently demonstrated how to do this this, so I made my own.

<figure>
  <img src="/images/blog/kmeans/harrypotter_original.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>Source: https://gph.is/1d8jEiU</figcaption>
</figure>

We can start by converting a gif to a series of images, running k-means on each of them, then converting the results back into a gif.

<figure class="third">
  <img src="/images/blog/kmeans/throwing_hats_non_seeded/2_random_clusters.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/throwing_hats_non_seeded/4_random_clusters.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/throwing_hats_non_seeded/10_random_clusters.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>Non-seeded k-means using 2, 4, and 10 center points.</figcaption>
</figure>

The k-means algorithm starts by randomly picking a fixed number of points as centroids. But when the images are stitched back together into an animation, this has an annoying side-effect where the images appear to flicker.

There's a fairly easy improvement we can make to reduce this. Instead of starting from random points on each image: start the first image randomly, then **seed subsequent iterations with the clusters found in the previous image**.

Since the position of items in the frames tend to change more than the items themselves, this makes for a good approximation for where clusters may also be at the next time step. Colors which are similar between frames should remain roughly where they are, whereas less common colors may be updated accordingly.

<figure class="third">
  <img src="/images/blog/kmeans/throwing_hats_seeded/harrypotter_2_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/throwing_hats_seeded/harrypotter_4_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/throwing_hats_seeded/harrypotter_10_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>k-means with 2, 4, and 10 center points. Each iteration is seeded with the previous clusters.</figcaption>
</figure>

Making this adjustment resolves the problem, and makes the animation much easier to watch.

I thought it would also be interesting to try different distance metrics (e.g. Manhattan Distance), but in this situation using Manhattan distance does not appear to produce substantially different results.

<figure class="third">
  <img src="/images/blog/kmeans/manhattan/2_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/manhattan/4_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/manhattan/10_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>k-means using Manhattan distance with 2, 4, and 10 center points. Each iteration is seeded with the previous clusters.</figcaption>
</figure>

## Gandalf in Green

<figure>
  <img src="/images/blog/kmeans/hobbits/hobbits_orig.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>Source: https://gph.is/13BUjL4</figcaption>
</figure>

Let's see a different wizard. Gandalf the Grey is unusually green here, likely due to the prolific foliage in the background which got mixed with the foreground somewhere between initialization and convergence. By the time that ten centers are used, some of the richer shades of violet start to appear alongside the green.

<figure class="third">
  <img src="/images/blog/kmeans/hobbits/2_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/hobbits/4_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/hobbits/10_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>k-means with Euclidean distance on Frodo and Gandalf.</figcaption>
</figure>

## Thoughts on Transferring Color Palettes

Now that we've seen some methods to perform color quantization in an unsupervised way, we might also wonder how easily we can transfer the clusters from one image to another.

One idea might be to run clustering on a target image to find a set of centers, determine their relative frequency in the original image, then use the colors and their relative frequencies to swap out the color palette in a new image (or gif).

<figure class="third">
  <img src="/images/blog/kmeans/hobbit_transfer/2_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/hobbit_transfer/5_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/hobbit_transfer/10_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>Applying the Harry Potter color palette to the Lord of the Rings image.</figcaption>
</figure>

<figure class="third">
  <img src="/images/blog/kmeans/potter_transfer/2_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/potter_transfer/5_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/potter_transfer/10_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>Applying the Lord of the Rings color palette to the Harry Potter image.</figcaption>
</figure>

This turns out to be a harder problem.

Just because two colors appear with similar relative frequencies in two different images, it does not mean that those shades will make sense in another image. However, this leaves an open problem to try out in the future.

*Last Updated: Tuesday, October 30, 2018.* Code will be posted in the next week or so.
