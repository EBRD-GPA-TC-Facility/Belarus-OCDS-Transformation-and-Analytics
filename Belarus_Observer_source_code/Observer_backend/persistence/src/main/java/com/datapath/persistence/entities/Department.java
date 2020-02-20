package com.datapath.persistence.entities;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "department")
@ToString(exclude = {"parties"})
public class Department {

    @Id
    @GeneratedValue()
    private Long id;

    @Column(name = "title", columnDefinition = "TEXT")
    private String title;

    @Column(name = "parent_id", columnDefinition = "TEXT")
    private String outerId;

    @OneToMany(mappedBy = "department")
    private List<Party> parties;


}
