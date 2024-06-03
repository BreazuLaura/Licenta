package com.example.demo.controller;

import com.example.demo.model.AmazonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.ValidationException;
import java.io.IOException;

@RestController
@RequestMapping("/storage/")
public class BucketController {
    private AmazonClient amazonClient;
    @Autowired
    BucketController(AmazonClient amazonClient) {
        this.amazonClient = amazonClient;
    }
    @PostMapping("/uploadFile")
    public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return this.amazonClient.uploadFile(file);
    }
    @DeleteMapping("/deleteFile")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }

    @GetMapping("/downloadFile")
    public Object downloadFile(@RequestBody String filename) throws ValidationException, IOException {
        return this.amazonClient.downloadFile(filename);
    }

}