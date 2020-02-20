package com.datapath.releasesintegration.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ReleasesResponseEntity {
    List<Content> content;

    @Data
    public static class Content{
        String ocid;
        String date;
    }

    public ReleasesResponseEntity(){
        this.content = new ArrayList<>();
    }

}
