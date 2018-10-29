---
layout: article
title: "Sequential k-Means Clustering with Animation"
description:
date: 2018-10-28
excerpt: A common application of k-means clustering is image segmentation. This demonstrates how to sequentially cluster colors in a gif to create smoother animation.
tags: ["machine-learning"]
image:
  teaser: teaser/kmeans_teaser.png
---

One of the common demonstrations for k-means clustering is as a pre-processing step for image segmentation, or as an automatic way to perform color quantization.

Inspired by this, the natural next step seemed to be applying the same techniques to video--or at least a series of moving images.

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

There's a fairly easy improvement we can make to reduce this. Instead of starting from random points on each image: start the first image randomly, then seed subsequent iterations with the clusters found in the previous image.

Since the position of items in the frames tend to change more than the items themselves, this makes for a good approximation at each step. Colors which are similar between frames should remain roughly where they are, whereas less common colors may be updated accordingly.

<figure class="third">
  <img src="/images/blog/kmeans/throwing_hats_seeded/harrypotter_2_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/throwing_hats_seeded/harrypotter_4_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <img src="/images/blog/kmeans/throwing_hats_seeded/harrypotter_10_centers.gif" style="display: block; margin-left: auto; margin-right: auto;">
  <figcaption>k-means with 2, 4, and 10 center points. Each iteration is seeded with the previous clusters.</figcaption>
</figure>

Making this adjustment resolves the problem, and makes the animation much easier to watch.

It's also possible to use different distance metrics (e.g. Manhattan Distance), but in this situation using Manhattan distance does not appear to produce substantially different results.

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

Now that we've seen some methods to perform color quantization, let's see if we can transfer the clusters found in one image to another.

The idea here will be to run clustering on a target image to find a set of centers, determine their relative frequency in the original image, then use the colors and their relative frequencies to swap out the color palette in a new image (or gif).

Given that we can apply clustering to find some of the most common colors in an image, we can additionally count to find how common each of the colors are. We can use the clusters found on one image to change the colors in another image.

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

This lead to some less-than-flawless results, but leaves a new challenge to work on.
