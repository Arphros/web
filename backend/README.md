# Blog System

### Getting Started
Setup basic file structure:

#### BACKEND 
--blog  
----L---blog-id   
-----------L-------[blog-id.md]  


#### FRONTEND  
---------static  
-----------L-------blog-assets  
-----------------------|---blog-id  
-----------------------|-----[main.png]   
-----------------------L-----[anyImage.png]   

>  DO NOT PUT FILES IN blog DIRECTORY.

### Use image
You can point image source to  
`/blog-assets/[blog-id]/[image].png`

### What are these files? 

- blog: All blog posts.
- blog-id:  Your preferred blog id.
- assets: All assets for blog-id.


- [blog-id.md]: Should be same as blog-id to avoid the confusion.
- [main.png]: Main image for blog-id. (Required)
- [anyImage.png]: Any image for blog. (Optional)

### Adding new blogs

- Create a new blog-id folder in blog directory.
- Create a new blog-id.md file in blog-id directory.
- Commit your changes and push to your repository.

### Blogs Info

Blog info contain about blog information.  

They are written as html comments  
e.g. `<!-- TITLE: My Blog Title -->`

All blog info syntax (case-sensitive): 

| Syntax       | Description               | 
|:-------------|:--------------------------|
| TITLE        | Blog Title                |
| DATE_WRITTEN | Date that blog is written |
| AUTHOR       | Author of blog            |
| TAGS         | Tags of blog              |
---------------------------------------------