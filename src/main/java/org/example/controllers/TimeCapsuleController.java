package org.example.controllers;

import org.example.domain.Result;
import org.example.models.AppUser;
import org.example.models.TimeCapsule;
import org.example.domain.TimeCapsuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/time-capsules")
public class TimeCapsuleController {

    @Autowired
    private TimeCapsuleService timeCapsuleService;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public TimeCapsule createTimeCapsule(
                                        @RequestParam("title") String title,
                                        @RequestParam("description") String description,
                                        @RequestParam("message") String message,
                                        @RequestParam("openDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date openDate,
                                        @RequestParam("userId") Long userId)
                                        /*@RequestParam("media") MultipartFile file)*/ throws IOException {

        TimeCapsule timeCapsule = new TimeCapsule();
        timeCapsule.setTitle(title);
        timeCapsule.setDescription(description);
        timeCapsule.setMessage(message);
        timeCapsule.setOpenDate(openDate);
        timeCapsule.setUserId(Math.toIntExact(userId));

/*        if (file != null && !file.isEmpty()) {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                boolean success = dir.mkdirs();
                if (!success) {
                    throw new IOException("Failed to create the directory: " + UPLOAD_DIR);
                }
            }
            File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
            file.transferTo(serverFile);
            timeCapsule.setMedia(serverFile.getPath());
        }*/
        return timeCapsuleService.addTimeCapsule(timeCapsule);
    }

    @PutMapping("/{capsuleId}")
    public ResponseEntity<?> updateTimeCapsule(@PathVariable("capsuleId") int capsuleId, @RequestBody TimeCapsule timeCapsule) {
        timeCapsule.setCapsuleId(capsuleId);

        if (timeCapsule != null && capsuleId != timeCapsule.getCapsuleId()) {
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        }
        Result<TimeCapsule> result = timeCapsuleService.updateTimeCapsule(timeCapsule);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(result.getPayload(), HttpStatus.OK);
    }

    @GetMapping("/previous")
    public List<TimeCapsule> getPreviousTimeCapsules(Authentication authentication) {
        AppUser appUser = (AppUser) authentication.getPrincipal();
        int userId = appUser.getId();
        return timeCapsuleService.getPreviousTimeCapsules(userId);
    }
    @GetMapping("/upcoming")
    public List<TimeCapsule> getUpcomingTimeCapsules(Authentication authentication) {
        AppUser appUser = (AppUser) authentication.getPrincipal();
        int userId = appUser.getId();
        return timeCapsuleService.getUpcomingTimeCapsules(userId);
    }
    @DeleteMapping("/{id}")
    public void deleteTimeCapsule(@PathVariable int id) {
        timeCapsuleService.deleteTimeCapsule(id);
    }


    @GetMapping("/{id}/retrieve")
    public TimeCapsule getTimeCapsule(@PathVariable int id) {
        return timeCapsuleService.getTimeCapsule(id);
    }

    @PutMapping("/{id}/open")
    public TimeCapsule openTimeCapsule(@PathVariable int id) {
        return timeCapsuleService.openTimeCapsule(id);
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<String> uploadImage(@PathVariable int id, @RequestParam("image") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file to upload.", HttpStatus.BAD_REQUEST);
        }

        try {
            File dir = new File(UPLOAD_DIR);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
            file.transferTo(serverFile);

            timeCapsuleService.saveImagePath(id, serverFile.getPath());

            return new ResponseEntity<>("File uploaded successfully: " + file.getOriginalFilename(), HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload the file.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/image/{filename}")
    public ResponseEntity<Resource> serveImage(@PathVariable String filename) {
        Path filePath = Paths.get(UPLOAD_DIR + filename);
        Resource fileResource = new FileSystemResource(filePath);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(fileResource);
    }

}