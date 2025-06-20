package com.kurukali.Hotelsanket.service;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.kurukali.Hotelsanket.exception.OurException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class AwsS3Service {



    @Autowired
    private Cloudinary cloudinary;

    public String saveImageToS3(MultipartFile photo) {
        String s3LocationImage = null;

        try {
                System.out.println("Uploading image to Cloudinary: " + photo.getOriginalFilename());
                Map<?, ?> uploadResult = cloudinary.uploader().upload(photo.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = uploadResult.get("url").toString();
                if (imageUrl.startsWith("http://")) {
                    imageUrl = imageUrl.replace("http://", "https://");
                }
                System.out.println("Image uploaded successfully. URL: " + imageUrl);
                return imageUrl;


//            String s3Filename = photo.getOriginalFilename();
//
//            BasicAWSCredentials awsCredentials = new BasicAWSCredentials(awsS3AccessKey, awsS3SecretKey);
//            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
//                    .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
//                    .withRegion(Regions.US_EAST_2)
//                    .build();
//
//            InputStream inputStream = photo.getInputStream();
//
//            ObjectMetadata metadata = new ObjectMetadata();
//            metadata.setContentType("image/jpeg");
//
//            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s3Filename, inputStream, metadata);
//            s3Client.putObject(putObjectRequest);
//            return "https://" + bucketName + ".s3.amazonaws.com/" + s3Filename;

        } catch (Exception e) {
            e.printStackTrace();
            throw new OurException("Unable to upload image to s3 bucket" + e.getMessage());
        }
    }
}

















